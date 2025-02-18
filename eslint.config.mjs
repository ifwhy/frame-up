import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import daStyle from 'eslint-config-dicodingacademy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  daStyle,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
