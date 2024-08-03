import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as nodemailer from "nodemailer"
import axios from 'axios';

import { Contact } from './schema/contact.schema';
import { verificationEmail, newsWeatherForecast } from '../email/email-templates';
@Injectable()
export class ContactService {
    private transporter: any;
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<Contact>,
        private configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }
    async register(email: string, place: string): Promise<{ err: number; msg: string; response?: any }> {
        try {
            const existingEmail = await this.contactModel.findOne({ email });
            if (existingEmail) {
                return {
                    err: 1,
                    msg: "Email has already registered",
                };
            }
            const contactInfo = new this.contactModel({ email, place });
            const response = await contactInfo.save();
            await this.sendConfirmationEmail(email, response._id.toString());
            return {
                err: 0,
                msg: "Email has registered successfully",
            };
        } catch (error) {
            return {
                err: 1,
                msg: `Email has registered failed: ${error.message}`,
            };
        }
    }
    async confirmEmail(id: string): Promise<{ err: number; msg: string }> {
        try {
            const contactInfo = await this.contactModel.findById(id);
            if (contactInfo) {
                contactInfo.confirmed = true;
                await contactInfo.save();
                return {
                    err: 0,
                    msg: "Email confirmed!",
                };
            }
            else {
                return {
                    err: 1,
                    msg: "Invalid confirmation link.",
                };
            }
        } catch (error) {
            return {
                err: 1,
                msg: `Error confirming email: ${error.message}`
            };
        }
    }
    async unsubscribe(email: string): Promise<{ err: number; msg: string }> {
        try {
            await this.contactModel.findOneAndDelete({ email })
            return {
                err: 0,
                msg: "You have been unsubscribed."
            }
        } catch (error) {
            return {
                err: 1,
                msg: `Error unsubscribing: ${error.message}`
            };
        }
    }
    private async sendConfirmationEmail(email: string, id: string): Promise<{ err: number; msg: string }> {
        const url = `${this.configService.get<string>('SERVER_API_URL')}/contact/confirm/${id}`;
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: email,
            subject: "Confirm your email",
            html: verificationEmail(url),
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return {
                err: 0,
                msg: "Verification email sent successfully"
            }
        } catch (error) {
            return {
                err: 1,
                msg: `Error sending verification email: ${error.message}`
            };
        }
    }
    async sendDailyForecast(): Promise<void> {
        try {
            const confirmedEmails = await this.contactModel.find({ confirmed: true });

            if (confirmedEmails.length > 0) {
                await Promise.all(
                    confirmedEmails.map(async (contact: any) => {
                        const weatherForecastData = await this.getWeatherForecastByCity(contact.place);
                        let htmlString = ' <ul style="display: flex; flex-wrap: wrap; gap: 25px; padding: 0; margin: 0; list-style-type: none;">';

                        weatherForecastData.forEach((weather: any, index: number) => {
                            htmlString += `
                            <li style="list-style: none; color: #fff; padding: 18px 16px; border-radius: 5px; background-color: #6c757d; width: calc(100% / 4 - 60px);">
                                <h3 style="font-weight: 500;">(${weather?.localTime})</h3>
                                <h4 style="font-size: 1rem; font-weight: 300; text-transform: capitalize; margin-top: 12px;">
                                Temperature: ${weather?.temp}
                                <sup style="font-size: 10px;">o</sup>C
                                </h4>
                                <h4 style="font-size: 1rem; font-weight: 300; text-transform: capitalize; margin-top: 12px;">Wind:${weather?.wind} m/h</h4>
                                <h4 style="font-size: 1rem; font-weight: 300; text-transform: capitalize; margin-top: 12px;">Humidity:${weather?.humidity}%</h4>
                            </li>`;

                        });

                        htmlString += '</ul>';

                        await this.transporter.sendMail({
                            from: this.configService.get<string>('EMAIL_USER'),
                            to: contact.email,
                            subject: 'Daily Weather Forecast',
                            html: newsWeatherForecast(this.configService.get<string>('CLIENT_URL'), htmlString),
                        });
                    }),
                );
            }
        } catch (error) {
            console.error('Error sending daily forecast:', error);
        }
    }
    private async getWeatherForecastByCity(place: string): Promise<any> {
        try {
            const response = await axios.get(`${this.configService.get<string>('WEATHER_API_URL')}/forecast.json`, {
                params: {
                    key: this.configService.get<string>('WEATHER_API_KEY'),
                    q: place,
                    days: 4,
                },
            });

            const weatherForecast = response.data;
            const today = new Date();
            const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')
                }-${String(today.getDate()).padStart(2, '0')}`;

            const newForecastData = weatherForecast?.forecast?.forecastday
                .flatMap((day: any) =>
                    day?.hour
                        ?.filter((weather: any) => weather.time.startsWith(todayString) && new Date(weather.time).getHours() % 6 === 0)
                        ?.map((weather: any) => ({
                            localTime: weather?.time?.split(" ")[1],
                            icon: weather?.condition?.icon,
                            temp: weather?.temp_c,
                            wind: weather?.wind_mph,
                            humidity: weather?.humidity,
                        }))
                );

            return newForecastData;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
        }
    }
}
