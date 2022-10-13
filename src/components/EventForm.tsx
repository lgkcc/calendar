import React, {useState} from 'react';
import {Button, Form, Input, notification, Row, TimePicker} from "antd";
import moment, {Moment} from "moment";
import {TEvent} from "../store/slices/eventSlice";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/reduxHook";
import {TDateFormat} from "../models/Date";
import {CheckCircleFilled, CheckCircleOutlined} from "@ant-design/icons";

interface IFormCreateEventProps {
    createEvent: (event: TEvent) => void
    update: string
}

const FormCreateEvent: React.FC<IFormCreateEventProps> = ({createEvent, update}) => {
    const {date} = useParams()
    const {events} = useAppSelector(state => state.event)
    const [form] = Form.useForm()
    const [event, setEvent] = useState<TEvent>(events.find(event => event.id === +update) || {
        date: date || '',
        type: 'success',
        startTime: '',
        endTime: '',
        title: '',
        id: Math.random()
    })

    const formSubmit = () => {
        notification.open({
            message: 'Событие добавлено',
            icon: <CheckCircleFilled style={{ color: 'green' }}/>,
        })
        createEvent(event)
    }

    const pickDate = (date: Moment | null, time: string) => {
        if (date) {
            setEvent((prevState: TEvent) => {
                return {...prevState, [time]: date.format(TDateFormat.HoursMinSec)}
            })
        }
    }

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent((prevState) => {
            return {...prevState, title: e.target.value}
        })
    }

    return (
        <Form onFinish={formSubmit} form={form}>
            <Form.Item name="title" initialValue={event.title}>
                <Input onChange={changeValue} />
            </Form.Item>
            <Form.Item name="startTime" initialValue={update && moment(event.startTime, TDateFormat.HoursMinSec)}>
                <TimePicker onChange={(date) => pickDate(date, 'startTime')}/>
            </Form.Item>
            <Form.Item name="endTime" initialValue={update && moment(event.endTime, TDateFormat.HoursMinSec)}>
                <TimePicker onChange={(date) => pickDate(date, 'endTime')}/>
            </Form.Item>
            <Form.Item>
                <Row justify="end">
                    <Button type='primary' htmlType="submit">Создать</Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default FormCreateEvent;