<?php

namespace App\Services;

use App\Models\Vehicle;
use Tymon\JWTAuth\JWTAuth;

class VehicleService
{
    protected $auth;
    protected $model;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);

        $this->model = app(Vehicle::class);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($where, $data)
    {
        return $this->model->update($where, $data);
    }

    public function delete($id)
    {
        return $this->model->delete($id);
    }

    public function search($filters)
    {
        return $this->model
            ->all()
            ->toArray();
    }

    public function exists($where)
    {
        return $this->model
            ->where($where)
            ->exists();
    }
}