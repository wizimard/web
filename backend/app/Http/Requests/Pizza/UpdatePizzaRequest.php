<?php

namespace App\Http\Requests\Pizza;

use App\Services\PizzaService;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdatePizzaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'string|nullable',
            'name' => 'string|nullable',
            'price' => 'integer|nullable',
            'model' => 'string|nullable'
        ];
    }

    public function validateResolved()
    {
        parent::validateResolved();

        $service = app(PizzaService::class);

        if (!$service->exists(['id' => $this->route('id')])) {
            throw new NotFoundHttpException('Pizza does not exist');
        }
    }
}
