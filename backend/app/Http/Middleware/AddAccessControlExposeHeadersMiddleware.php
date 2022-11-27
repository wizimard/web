<?php

namespace App\Http\Middleware;

use Closure;

class AddAccessControlExposeHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods','GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}
