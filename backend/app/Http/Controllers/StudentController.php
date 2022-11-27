<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\CreateStudentRequest;
use App\Http\Requests\Student\DeleteStudentRequest;
use App\Http\Requests\Student\GetStudentRequest;
use App\Http\Requests\Student\SearchStudentRequest;
use App\Http\Requests\Student\UpdateStudentRequest;
use App\Services\StudentService;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends Controller
{
    public function create(CreateStudentRequest $request, StudentService $service)
    {
        $result = $service->create($request->all());

        return response()->json($result);
    }

    public function update(UpdateStudentRequest $request, StudentService $service, $id)
    {
        $result = $service->update(['id' => $id], $request->all());

        Log::debug($result);

        return response('', Response::HTTP_NO_CONTENT)->header('Access-Control-Allow-Origin', '*');
    }

    public function delete(DeleteStudentRequest $request, StudentService $service, $id)
    {
        $service->delete($id);

        return response('', Response::HTTP_OK);
    }

    public function search(SearchStudentRequest $request, StudentService $service)
    {
        $result = $service->search($request->all());

        return response()->json($result);
    }

    public function get(GetStudentRequest $request, StudentService $service, $id)
    {
        $result = $service->get($id);

        return response()->json($result);
    }
}
