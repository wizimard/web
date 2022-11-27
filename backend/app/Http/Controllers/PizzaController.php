<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pizza\CreatePizzaRequest;
use App\Http\Requests\Pizza\DeletePizzaRequest;
use App\Http\Requests\Pizza\GetPizzaRequest;
use App\Http\Requests\Pizza\SearchPizzaRequest;
use App\Http\Requests\Pizza\UpdatePizzaRequest;
use App\Services\PizzaService;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PizzaController extends Controller
{
    public function create(CreatePizzaRequest $request, PizzaService $service)
    {
		$result = $service->create($request->all());
		
		return response()->json($result);
    }

    public function update(UpdatePizzaRequest $request, PizzaService $service, $id)
    {
        $result = $service->update(['id' => $id], $request->all());

        Log::debug($result);

        return response('', Response::HTTP_NO_CONTENT)->header('Access-Control-Allow-Origin', '*');
    }

    public function delete(DeletePizzaRequest $request, PizzaService $service, $id)
    {
        $service->delete($id);

        return response('', Response::HTTP_OK);
    }

    public function search(SearchPizzaRequest $request, PizzaService $service)
    {
        $result = $service->search($request->all());

        return response()->json($result);
    }

    public function get(GetPizzaRequest $request, PizzaService $service, $id)
    {
        $result = $service->get($id);

        return response()->json($result);
    }
}
