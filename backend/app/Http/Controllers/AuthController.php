<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SocialLoginRequest;
use App\Services\AuthService;
use GuzzleHttp\Client;
use Illuminate\Http\Response;
use \Google_Client;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(LoginRequest $request, AuthService $service)
    {
        $result = $service->login($request);

        if ($result === false) {
            return response()->json([
                'message' => 'Authorization failed'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json($result)->header('Access-Control-Allow-Origin', '*');
    }

    public function socialLogin(SocialLoginRequest $request, AuthService $service)
		{
        $request = $request->all();

        $client = new Client();
        $response = $client->get("https://oauth2.googleapis.com/tokeninfo?id_token={$request['data']['tokenId']}");
        $payload = json_decode($response->getBody(), true);

        if ($payload && $service->exist($payload['email'])) {
            $result = $service->getSocialUser($payload['email']);

            return response()
                ->json($result)
                ->header('Access-Control-Allow-Origin', '*');
        }

        if ($payload && !$service->exist($payload['email'])) {
            $service->createUser($payload);
            $result = $service->getSocialUser($payload['email']);

            return response()
                ->json($result)
                ->header('Access-Control-Allow-Origin', '*');
        }

        return response()->json([
            'message' => 'Authorization failed'
        ], Response::HTTP_UNAUTHORIZED);
    }
}
