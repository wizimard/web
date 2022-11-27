<?php

namespace App\Http\Requests\Student;

use App\Services\StudentService;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateStudentRequest extends FormRequest
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

        $service = app(StudentService::class);

        if (!$service->exists(['id' => $this->route('id')])) {
            throw new NotFoundHttpException('Student does not exist');
        }
    }
}