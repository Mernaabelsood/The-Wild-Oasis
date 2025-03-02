import Form from '../../ui/Form';

import Input from '../../ui/Input';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {

  const {isLoading, settings} = useSettings();
  return (
    <Form>
      <div label='Minimum nights/booking'>
        <Input type='number' id='min-nights' />
      </div>
      <div label='Maximum nights/booking'>
        <Input type='number' id='max-nights' />
      </div>
      <div label='Maximum guests/booking'>
        <Input type='number' id='max-guests' />
      </div>
      <div label='Breakfast price'>
        <Input type='number' id='breakfast-price' />
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;
