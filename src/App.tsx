import 'antd/dist/antd.min.css'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CalendarPage from './pages/CalendarPage'
import EventsListPage from './pages/EventsListPage'
import { useAppSelector } from './hooks/reduxHook'
import { notificationCreate } from './utils'

const App: React.FC = () => {
  const { notificationEvent } = useAppSelector((state) => state.event)
  useEffect(() => {
    for (let event of notificationEvent) {
      notificationCreate(
        event.notificationTime || 0,
        event.title,
        event.startTime,
        event.endTime
      )
    }
  }, [notificationEvent])
  return (
    <>
      <Routes>
        <Route path={'/'} element={<CalendarPage />} />
        <Route path={'/:date'} element={<EventsListPage />} />
      </Routes>
    </>
  )
}

export default App
