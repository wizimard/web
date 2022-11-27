<?php

namespace App\Http\Requests\Pizza;

use Illuminate\Foundation\Http\FormRequest;

class CreatePizzaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'string|required',
            'name' => 'string|required',
            'price' => 'integer|required',
            'model' => 'string|required'
        ];
    }
}
