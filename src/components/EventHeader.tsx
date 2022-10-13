import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { RollbackOutlined } from '@ant-design/icons'

interface IEventHeaderProps {
  openCreateForm: () => void
  isActually: boolean
}

const EventHeader: React.FC<IEventHeaderProps> = ({
  openCreateForm,
  isActually
}) => {
  return (
    <div className="event-header">
      <Button type="primary" disabled={!isActually} onClick={openCreateForm}>
        + New event
      </Button>
      <Link to="/">
        <RollbackOutlined />
      </Link>
    </div>
  )
}

export default EventHeader
