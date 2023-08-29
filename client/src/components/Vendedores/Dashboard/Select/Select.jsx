import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';



export default function BasicSelect() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
    <div>

    <FormControl sx={{ m: 1, minWidth: 120, color: "white", borderRadius:55}}>
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ border:"1px solid white", '& .MuiSelect-icon': { color: '#fff' } }}
      >
        <MenuItem value=""  sx={{color: '#fff', border: "1px solid white" }}>
          <em className='text-white'>None</em>
        </MenuItem>
        <MenuItem sx={{color: '#fff', border: "1px solid white" }} value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText>Without label</FormHelperText>
    </FormControl>
  </div>
	);
}


