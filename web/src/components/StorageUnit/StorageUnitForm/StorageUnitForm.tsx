import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditStorageUnitById, UpdateStorageUnitInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormStorageUnit = NonNullable<EditStorageUnitById['storageUnit']>

interface StorageUnitFormProps {
  storageUnit?: EditStorageUnitById['storageUnit']
  onSave: (data: UpdateStorageUnitInput, id?: FormStorageUnit['id']) => void
  error: RWGqlError
  loading: boolean
}

const StorageUnitForm = (props: StorageUnitFormProps) => {
  const onSubmit = (data: FormStorageUnit) => {
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.storageUnit?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormStorageUnit> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.storageUnit?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="roomId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Room id
        </Label>
        
          <NumberField
            name="roomId"
            defaultValue={props.storageUnit?.roomId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="roomId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.storageUnit?.userId}
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

export default StorageUnitForm
