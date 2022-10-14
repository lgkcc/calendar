import React, { useEffect, useRef, useState } from 'react'
import { Button, ConfigProvider, Empty, List, Modal } from 'antd'
import EventForm from '../components/EventForm'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { useParams } from 'react-router-dom'
import { addEvent, removeEvent, TEvent } from '../store/slices/eventSlice'
import Event from '../components/Event'
import EventHeader from '../components/EventHeader'
import moment from 'moment/moment'
import { TDateFormat } from '../models/Date'
import { Helmet } from 'react-helmet'

const EventsListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [update, setUpdate] = useState('')

  const { events } = useAppSelector((state) => state.event)
  const { date } = useParams()
  const dispatch = useAppDispatch()

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('events', JSON.stringify(events))
    }
    isMounted.current = true
  }, [events])

  const data = events.filter((event) => event.date === date)

  const createEvent = (newEvent: TEvent) => {
    dispatch(addEvent(newEvent))
    setIsModalOpen(false)
  }
  const deleteEvent = (id: number) => dispatch(removeEvent(id))

  const openCreateForm = () => {
    setIsModalOpen(true)
    setUpdate('')
  }
  const openUpdateForm = (id: number) => {
    setIsModalOpen(true)
    setUpdate(String(id))
  }

  const isActually = moment().isSameOrBefore(
    moment(date, TDateFormat.DayMonthYear),
    'day'
  )

  return (
    <div className="events">
      <Helmet>
        <title>Календарь | {date}</title>
      </Helmet>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="No Event" image={Empty.PRESENTED_IMAGE_SIMPLE}>
            {isActually && (
              <Button
                type="primary"
                onClick={openCreateForm}
                disabled={!isActually}
              >
                Create Now
              </Button>
            )}
          </Empty>
        )}
      >
        <List
          header={
            <EventHeader
              openCreateForm={openCreateForm}
              isActually={isActually}
            />
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="event">
              <Event
                title={item.title}
                id={item.id}
                startTime={item.startTime}
                endTime={item.endTime}
                openUpdateForm={openUpdateForm}
                deleteEvent={deleteEvent}
                notificationTime={item.notificationTime}
              />
            </List.Item>
          )}
        />
      </ConfigProvider>
      <Modal
        title={update ? 'Edit Event' : 'New event'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <EventForm createEvent={createEvent} update={update} />
      </Modal>
    </div>
  )
}

export default EventsListPage
