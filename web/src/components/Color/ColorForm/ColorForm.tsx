import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditColorById, UpdateColorInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormColor = NonNullable<EditColorById['color']>

interface ColorFormProps {
  color?: EditColorById['color']
  onSave: (data: UpdateColorInput, id?: FormColor['id']) => void
  error: RWGqlError
  loading: boolean
}

const ColorForm = (props: ColorFormProps) => {
  const onSubmit = (data: FormColor) => {
  
    
    
  
    
    
  
    props.onSave(data, props?.color?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormColor> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="color"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color
        </Label>
        
          <TextField
            name="color"
            defaultValue={props.color?.color}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="color" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.color?.userId}
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

export default ColorForm
