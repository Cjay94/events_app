"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"

import { EventFormProps } from "@/types"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createEvent } from "@/lib/actions/event.actions"



const EventForm = ({ userId, type }: EventFormProps) => {

    const [files, setFiles] = useState<File[]>([])
    const initialValues = eventDefaultValues;

    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({

        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues

    })

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {

        let uploadedImageUrl = values.imageUrl

        if (files.length > 0) {

            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'Create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })


                if (newEvent) {
                    form.reset()
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5 ">
                    {/* Title Field */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Event title"
                                        className="input-field"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category Dropdown */}
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown
                                        value={field.value}
                                        onChangeHandler={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5 ">
                    {/* Description TextField */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea
                                        placeholder="Description"
                                        className="textarea rounded-2xl"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Image upLoader */}
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    {/* Location Field */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-14 w-full py-2 px-4 overflow-hidden rounded-full bg-grey-50">
                                        <Image
                                            src="/assets/icons/location-grey.svg"
                                            alt="Location"
                                            width={24}
                                            height={24}
                                        />

                                        <Input placeholder="Event location or Online" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    {/* Calender Start Field */}
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-14 w-full py-2 px-4 overflow-hidden rounded-full bg-grey-50">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="Calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="EEE, dd MMM yyyy hh:mm a "
                                            wrapperClassName="datePicker cursor-pointer"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Calender End Field */}
                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-14 w-full py-2 px-4 overflow-hidden rounded-full bg-grey-50">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="Calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="EEE, dd MMM yyyy hh:mm a"
                                            wrapperClassName="datePicker cursor-pointer"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-14 w-full py-2 px-4 overflow-hidden rounded-full bg-grey-50">
                                        <Image
                                            src="/assets/icons/dollar.svg"
                                            alt="Price"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            className="p-regular-16 border-0 bg-grey-50 
                                            outline-offset-0 focus:border-0 focus-visible:ring-0 
                                            focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label
                                                                htmlFor="isFree"
                                                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                Free Ticket
                                                            </label>
                                                            <Checkbox
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value}
                                                                id="isFree"
                                                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-14 w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />
                                        <Input placeholder="URL" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : `${type} Event `}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm