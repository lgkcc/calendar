import React, { useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  TimePicker
} from 'antd'
import moment, { Moment } from 'moment'
import { TEvent } from '../store/slices/eventSlice'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHook'
import { TDateFormat } from '../models/Date'
import { CheckCircleFilled } from '@ant-design/icons'
import { rules, notificationCreate } from '../utils'

interface IFormCreateEventProps {
  createEvent: (event: TEvent) => void
  update: string
}

const EventForm: React.FC<IFormCreateEventProps> = ({
  createEvent,
  update
}) => {
  const { date } = useParams()
  const { events } = useAppSelector((state) => state.event)

  const [event, setEvent] = useState<TEvent>(
    events.find((event) => event.id === +update) || {
      date: date || '',
      startTime: '',
      endTime: '',
      title: '',
      id: Math.random(),
      notificationTime: null
    }
  )
  const [form] = Form.useForm()

  const pickDate = (date: Moment | null, time: string) => {
    if (date) {
      setEvent((prevState: TEvent) => {
        return { ...prevState, [time]: date.format(TDateFormat.HoursMinSec) }
      })
    }
  }
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent((prevState) => {
      return { ...prevState, title: e.target.value }
    })
  }

  const formSubmit = () => {
    notification.open({
      message: update ? 'Событие обновлено!' : 'Событие добавлено!',
      icon: <CheckCircleFilled style={{ color: 'green' }} />
    })
    notificationCreate(
      event.notificationTime || 0,
      event.title,
      event.startTime,
      event.endTime
    )
    createEvent(event)
  }

  return (
    <Form onFinish={formSubmit} form={form}>
      <Form.Item
        name="title"
        initialValue={event.title}
        rules={[rules.required()]}
      >
        <Input onChange={changeValue} placeholder="Название события" />
      </Form.Item>
      <Form.Item
        name="startTime"
        initialValue={
          update && moment(event.startTime, TDateFormat.HoursMinSec)
        }
        rules={[rules.required()]}
      >
        <TimePicker
          onChange={(date) => pickDate(date, 'startTime')}
          placeholder="Время начала"
        />
      </Form.Item>
      <Form.Item
        name="endTime"
        initialValue={update && moment(event.endTime, TDateFormat.HoursMinSec)}
        rules={[rules.required(), rules.more('Событие не может закончиться раньше начала',event.startTime, event.endTime)]}
      >
        <TimePicker
          onChange={(date) => pickDate(date, 'endTime')}
          placeholder="Время конца"
        />
      </Form.Item>
      <Form.Item
        name="notificationTime"
        initialValue={update && event.notificationTime}
      >
        <InputNumber
          onChange={(value) => setEvent({ ...event, notificationTime: value })}
          placeholder="За сколько минут напомнить"
          min={1}
          max={60}
          addonAfter="минут"
        />
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            {update ? 'Обновить' : 'Создать'}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default EventForm
