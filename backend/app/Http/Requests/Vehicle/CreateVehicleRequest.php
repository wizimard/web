<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class CreateVehicleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'model' => 'string|required',
            'type' => 'string|nullable',
            'brand' => 'string|required',
            'release_year' => 'integer'
        ];
    }
}