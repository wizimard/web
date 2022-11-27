<?php

namespace App\Services;

use App\Models\Student;
use Tymon\JWTAuth\JWTAuth;

class StudentService
{
    protected $auth;
    protected $studentModel;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);

        $this->studentModel = app(Student::class);
    }

    public function create($data)
    {
        return $this->studentModel->create($data);
    }

    public function update($where, $data)
    {
        return $this->studentModel
            ->where($where)
            ->update($data);
    }

    public function get($id)
    {
        return $this->studentModel
            ->where(['id' => $id])
            ->first()
            ->toArray();
    }

    public function delete($id)
    {
        return $this->studentModel
            ->where(['id' => $id])
            ->delete();
    }

    public function search($filters)
    {
        return $this->studentModel
            ->all()
            ->toArray();
    }

    public function exists($where)
    {
        return $this->studentModel
            ->where($where)
            ->exists();
    }
}