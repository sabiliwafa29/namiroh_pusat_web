<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function success($data, string $message = 'Success', int $status = 200, array $meta = []): JsonResponse
    {
        $response = [
            'data'    => $data,
            'meta'    => array_merge([
                'message' => $message,
                'status'  => $status,
            ], $meta),
            'links'   => [],
        ];

        return response()->json($response, $status);
    }

    protected function paginated($paginator, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'message'      => $message,
                'status'       => 200,
                'current_page' => $paginator->currentPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'last_page'    => $paginator->lastPage(),
            ],
            'links' => [
                'first' => $paginator->url(1),
                'last'  => $paginator->url($paginator->lastPage()),
                'prev'  => $paginator->previousPageUrl(),
                'next'  => $paginator->nextPageUrl(),
            ],
        ], 200);
    }

    protected function error(string $message, int $status = 400, $errors = null): JsonResponse
    {
        $response = [
            'data' => null,
            'meta' => [
                'message' => $message,
                'status'  => $status,
            ],
            'links' => [],
        ];

        if ($errors) {
            $response['meta']['errors'] = $errors;
        }

        return response()->json($response, $status);
    }
}
