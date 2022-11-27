<?php

use \Illuminate\Http\Response;
use Tests\TestCase;

class StudentTest extends TestCase
{
    public function testCreate()
    {
        $student = $this->getJsonFixture('StudentTest', 'create_student.json');

        $response = $this->json('post', '/student', $student);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUpdate()
    {
        $student = $this->getJsonFixture('StudentTest', 'update_student.json');

        $response = $this->json('put', '/student/1', $student);

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function testDelete()
    {
        $response = $this->json('delete', '/student/1');

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testGet()
    {
        $actual = $this->json('get', '/student/1');

        $expected = $this->getJsonFixture('StudentTest', 'get_student.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearch()
    {
        $actual = $this->json('get', '/student');

        $expected = $this->getJsonFixture('StudentTest', 'search_student.json');

        $this->assertEquals($expected, $actual->json());
    }
}