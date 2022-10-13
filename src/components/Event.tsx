import React from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { TEvent } from '../store/slices/eventSlice'

interface IEventProps extends Omit<TEvent, 'date'> {
  openUpdateForm: (id: number) => void
  deleteEvent: (id: number) => void
}

const Event: React.FC<IEventProps> = ({
  title,
  startTime,
  endTime,
  id,
  openUpdateForm,
  deleteEvent
}) => {
  return (
    <>
      <div>
        <h2>{title}</h2>
        <time>
          {startTime} до {endTime}
        </time>
      </div>
      <div>
        <EditOutlined onClick={() => openUpdateForm(id)} />
        <DeleteOutlined onClick={() => deleteEvent(id)} />
      </div>
    </>
  )
}

export default Event
