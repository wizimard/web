<?php

namespace App\Http\Requests\Vehicle;

use App\Services\StudentService;
use App\Services\VehicleService;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'string|nullable',
            'group' => 'string|nullable',
            'subgroup' => 'integer|in:1,2|nullable',
            'card_number' => 'string|nullable'
        ];
    }

    public function validateResolved()
    {
        parent::validateResolved();

        $service = app(VehicleService::class);

        if (!$service->exists(['id' => $this->route('id')])) {
            throw new NotFoundHttpException('Vehicle does not exist');
        }
    }
}