"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
    FieldValues,
     SubmitHandler,
     useForm
     } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";


const Form = () => {

    const {conversationId}=useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            message:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setValue('message','',{shouldValidate:true});   //clear the message input onSubmit
        axios.post('/api/messages',{
            ...data,
            conversationId:conversationId
        })
    }


    return (
        <div className="
        py-4
        px-4
        bg-white
        borde-t
        flex
        item-center
        gap-2
        lg:gap-4
        w-full
        ">
            <HiPhoto size={32} className="text-sky-500"/>
            <form onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lp:gap-4 w-full">
                <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                placeholder="Write a message"/>
            </form>
        </div>
    );
}

export default Form;