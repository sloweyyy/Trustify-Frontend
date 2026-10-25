import React from 'react';
import { Button } from '@mui/material';
export default function FilterButton({ option, handleFilter, clickedButton, iconMap }) {
  return <Button variant={option === clickedButton ? 'contained' : 'text'} aria-pressed={option === clickedButton} startIcon={iconMap[option] || null} onClick={() => handleFilter(option)}>{option}</Button>;
}
