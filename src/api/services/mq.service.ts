import amqp from 'amqplib/callback_api';
import {Container, Service} from "typedi";
import {AdService} from "./ad.service";
import {IAd} from "../models/ad.model";
import {ForbiddenError} from "../errors";

export const connectionString = 'amqp://localhost';
export const queueName = 'Ads';

@Service()
export class MqService {

    initMq() {
        amqp.connect(connectionString, (err, connection) => {
            if (err) {
                throw new ForbiddenError(
                    'Mq Service error on connection (InitMq)',
                    'Sorry, there is a problem with our server',
                    new Error(err));
            }
            connection.createChannel(async (err, channel) => {
                if (err) {
                    throw new ForbiddenError(
                        'Mq Service error on create channel',
                        'Sorry, there is a problem with our server',
                        new Error(err));
                }
                const adService = Container.get(AdService);
                channel.assertQueue(queueName, {durable: false});
                channel.consume(queueName, (msg: any) => {
                    channel.ack(msg);
                    if (msg) {
                        adService.createAd(JSON.parse(msg.content.toString()));
                    }
                }, {
                    noAck: false
                });
            });
        });
    }

    createAdViaMq(msg: IAd) {
        const connectionString = 'amqp://localhost';
        const queueName = 'Ads';
        amqp.connect(connectionString, (err, connection) => {
            if (err) {
                throw new ForbiddenError(
                    'Mq Service error on connection (createAdViaMq)',
                    'Sorry, there is a problem with our server',
                    new Error(err));
            }
            connection.createChannel((err, channel) => {
                if (err) {
                    throw new ForbiddenError(
                        'Mq Service error on create channel',
                        'Sorry, there is a problem with our server',
                        new Error(err));
                }
                channel.assertQueue(queueName, {durable: false});
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
                setTimeout(() => {
                    connection.close(); // after send the msg to the queue no the connection is not required
                    // so i prefer to delete
                }, 1000);
            });
        });
    }
}


