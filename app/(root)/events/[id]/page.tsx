import { getEventById } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types'
import React from 'react'

const EventsDetails = async ({ params: { id } }: SearchParamProps) => {

    const event = await getEventById(id);

    return (
        <div className="">hello</div>
    )
}

export default EventsDetails