import { ThemePalette } from '@angular/material/core';

export declare type Theme = 'dark'

export declare type Palette =
  | ThemePalette
  | 'primaryLight'
  | 'accentLight'
  | 'paper'
  | 'default'
  | 'disable'
  | 'table'
  | 'text'
  | 'success';

export type Color = { [color in Palette as string]: string };

export const palette: Color = {
  primary: '#673ab7',
  primaryLight: '#8c52f0',
  accent: '#56c04d',
  accentLight: '#1d8813',
  warn: '#d83020',
  paper: '#fff',
  default: '#bababa',
  disable: ' rgba(0, 0, 0, 0.26)',
  table: '#F8F8F8',
  text: '#000000',
  success: '#59a437',
};

