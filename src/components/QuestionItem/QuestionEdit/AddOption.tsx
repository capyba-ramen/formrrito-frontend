import AddIcon from '@mui/icons-material/Add';
import { OptionField } from '@/types/option';

export interface AddOptionProps {
  append: (option: OptionField) => void;
  currentLength: number;
}

const AddOption = (props: AddOptionProps) => {
  const { append } = props;
  const handleAddOption = () => {
    append({
      optionId: '',
      title: `Option ${props.currentLength + 1}`,
    });
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', color: 'var(--black)', cursor: 'pointer' }}
      onClick={handleAddOption}
    >
      <AddIcon sx={{ marginRight: '4px' }} /> Add option
    </div>
  );
};

AddOption.displayName = 'AddOption';

export default AddOption;
