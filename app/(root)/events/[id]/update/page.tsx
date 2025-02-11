import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs/server';

const UpdateEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;
    const event = await getEventById(id);

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-left md:text-center">
                    Update Event
                </h3>
            </section>

            <section className="wrapper my-8">
                <EventForm type="Update" event={event} eventId={event._id} userId={userId} />
            </section>
        </>
    );
};

export default UpdateEvent;
