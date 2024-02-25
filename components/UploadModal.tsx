"use client"

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setLoading] = useState(false);
  const {user} =useUser();
  const supabaseClient = useSupabaseClient();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
    author:'',
    title:'',
    song:'null',
    image:'null',
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async(values) => {
    try {
      setLoading(!true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user){
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();
      //upload song
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
      .storage
      .from ('songs')
      .upload(`song-$(values.title)-$uniqueID` , songFile, {
        cacheControl: '3600',
        upsert: false
      });
      
    }catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal 
    title="Add a song"
    description="Upload an flie"
    isOpen={uploadModal.isOpen}
    onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input id="title" disabled={isLoading} {...register('title', {required: true})} placeholder="Song title"/>
        <Input id="author" disabled={isLoading} {...register('author', {required: true})} placeholder="Song author"/>
        <div>
          <div>
            Select a song file
          </div>
          <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register('song', {required: true})} />
        </div>

        <div>
          <div>
            Select an image
          </div>
          <Input id="image" type="file" disabled={isLoading} accept="image/*" {...register('image', {required: true})} />
        </div>
        <Button disabled={isLoading} type="submit" className="text-white">Create</Button>
      </form>
    </Modal>
  )
}

export default UploadModal