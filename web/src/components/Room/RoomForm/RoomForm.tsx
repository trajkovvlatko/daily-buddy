import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditRoomById, UpdateRoomInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormRoom = NonNullable<EditRoomById['room']>

interface RoomFormProps {
  room?: EditRoomById['room']
  onSave: (data: UpdateRoomInput, id?: FormRoom['id']) => void
  error: RWGqlError
  loading: boolean
}

const RoomForm = (props: RoomFormProps) => {
  const onSubmit = (data: FormRoom) => {
  
    
    
  
    
    
  
    props.onSave(data, props?.room?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRoom> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.room?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.room?.userId}
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

export default RoomForm
