import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { RollbackOutlined } from '@ant-design/icons'

interface IEventHeaderProps {
  openCreateForm: () => void
  openAlert: () => void
  isActually: boolean
}

const EventHeader: React.FC<IEventHeaderProps> = ({
  openCreateForm,
  isActually,
  openAlert
}) => {
  return (
    <div className="event-header">
      <Button type="primary" onClick={isActually ? openCreateForm : openAlert}>
        + New event
      </Button>
      <Link to="/">
        <RollbackOutlined />
      </Link>
    </div>
  )
}

export default EventHeader
