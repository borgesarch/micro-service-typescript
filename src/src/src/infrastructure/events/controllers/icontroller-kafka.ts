import { EachMessagePayload, Kafka } from 'kafkajs'

export interface IControllerKafka {
    create (kafka: Kafka, payload: EachMessagePayload) : Promise<void>
}
