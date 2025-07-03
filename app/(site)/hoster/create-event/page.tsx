'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '@/components/ui/FormInput';
import { IEvent, IEventType } from '@/types/EventTypes';
import FirstTitle from '@/components/ui/FIrstTitle';

type IEventForm = Omit<IEvent, '_id' | 'registeredUsers'>;
const eventTypes: IEventType[] = ['club', 'council', 'fest', 'workshop', 'dept', 'others'];

const CreateEventForm = () => {
  const [formData, setFormData] = useState<IEventForm>({
    title: '',
    hosterId: '',
    hostedBy: '',
    eventType: 'others',
    date: '',
    endDate: '',
    time: '',
    venue: '',
    description: '',
    tags: [],
    instagramLink: '',
    registrationLink: '',
  });

  const [tagsInput, setTagsInput] = useState(''); // For comma-separated tags input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load hoster info from localStorage session
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setFormData(prev => ({
          ...prev,
          hosterId: parsed.user.id || '',
          hostedBy: parsed.user.organisation || '',
        }));
      } catch {
        console.warn('Invalid session in localStorage');
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      setTagsInput(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const tagsArray = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
      
    console.log(formData)
    try {
      const response = await axios.post('/api/event/create', {
        ...formData,
        tags: tagsArray,
    });
    
      if (response.data.success) {
        setMessage('✅ Event created successfully!');
        setFormData({
          title: '',
          hosterId: formData.hosterId,
          hostedBy: formData.hostedBy,
          eventType: 'others',
          date: '',
          endDate: '',
          time: '',
          venue: '',
          description: '',
          tags: [],
          instagramLink: '',
          registrationLink: '',
        });
        setTagsInput('');
      } else {
        setMessage('❌ Failed to create event.');
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ ${error.response?.data?.message || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col mt-30 justify-center items-center p-4">
        <div className='mb-20'>
            <FirstTitle title='create the event' color='text-light' />
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-secondary-1/40 flex flex-col justify-center items-center mx-auto gap-6 w-2xl py-20 rounded-3xl p-4"
      >
        <FormInput
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Event Type"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          as="select"
          options={eventTypes}
          required
        />

        <FormInput
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <FormInput
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
        />

        <FormInput
          label="Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          as="textarea"
          required
        />

        <FormInput
          label="Tags (comma separated)"
          name="tags"
          value={tagsInput}
          onChange={handleChange}
        />

        <FormInput
          label="Instagram Link"
          name="instagramLink"
          value={formData.instagramLink}
          onChange={handleChange}
        />

        <FormInput
          label="Registration Link"
          name="registrationLink"
          value={formData.registrationLink}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading} className="bg-light p-2 rounded-full mt-10 text-secondary-1 font-bold hover:scale-105 duration-150">
          {loading ? 'Creating...' : 'Create Event'}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </main>
  );
};

export default CreateEventForm;
