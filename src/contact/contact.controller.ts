import { Controller, Post, Get, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ContactService } from './contact.service';
import { confirmSuccessHtml } from '../email/email-templates';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService,
        private readonly configService: ConfigService,
    ) { }
    @Post('register')
    async register(@Res() res: Response, @Body('email') email: string, @Body('place') place: string) {
        try {
            const response = await this.contactService.register(email, place);
            if (response?.err === 0) {
                return res.status(201).json(response);
            }
            return res.status(400).json(response);
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: `Fail at contact controller:${error.message}`,
            });
        }
    }
    @Get('confirm/:id')
    async confirm(@Res() res: Response, @Param('id') id: string) {
        try {
            const response = await this.contactService.confirmEmail(id);
            if (response?.err === 0) {
                const url = this.configService.get<string>("CLIENT_URL");
                return res.status(200).send(confirmSuccessHtml(url));
            }
            return res.status(400).json(response);
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: `Fail at contact controller:${error.message}`,
            });
        }
    }
    @Post('unsubscribe')
    async unsubscribe(@Res() res: Response, @Body('email') email: string) {
        try {
            const response = await this.contactService.unsubscribe(email);
            if (response?.err === 0) {
                return res.status(200).send(response);
            }
            else {
                return res.status(400).send(response);
            }
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: `Fail at contact controller:${error.message}`,
            });
        }
    }
}
