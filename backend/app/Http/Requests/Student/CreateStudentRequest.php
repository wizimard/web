<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class CreateStudentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'string|required',
            'group_name' => 'string|required',
            'subgroup' => 'integer|in:1,2',
            'card_number' => 'string|nullable'
        ];
    }
}
