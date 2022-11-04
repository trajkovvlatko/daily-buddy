import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditCalendarById, UpdateCalendarInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormCalendar = NonNullable<EditCalendarById['calendar']>

interface CalendarFormProps {
  calendar?: EditCalendarById['calendar']
  onSave: (data: UpdateCalendarInput, id?: FormCalendar['id']) => void
  error: RWGqlError
  loading: boolean
}

const CalendarForm = (props: CalendarFormProps) => {
  const onSubmit = (data: FormCalendar) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.calendar?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCalendar> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        
          <TextField
            name="title"
            defaultValue={props.calendar?.title}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="color"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color
        </Label>
        
          <TextField
            name="color"
            defaultValue={props.calendar?.color}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="color" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>
        
          <TextField
            name="url"
            defaultValue={props.calendar?.url}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.calendar?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CalendarForm
