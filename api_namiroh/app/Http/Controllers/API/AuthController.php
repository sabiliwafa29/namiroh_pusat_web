<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * Register admin baru
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role'     => 'sometimes|in:admin,staff,manajer',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => $validated['role'] ?? 'staff',
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return $this->success([
            'user'  => $user,
            'token' => $token,
        ], 'Registrasi berhasil', 201);
    }

    /**
     * Login & dapatkan token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->error('Email atau password salah', 401);
        }

        // Hapus token lama, buat yang baru
        $user->tokens()->delete();
        $token = $user->createToken('api-token')->plainTextToken;

        return $this->success([
            'user'  => $user,
            'token' => $token,
        ], 'Login berhasil');
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->success(null, 'Logout berhasil');
    }

    /**
     * Data user yang sedang login
     */
    public function me(Request $request)
    {
        return $this->success($request->user(), 'Data user');
    }

    /**
     * Ganti password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return $this->error('Password lama tidak sesuai', 422);
        }

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return $this->success(null, 'Password berhasil diubah');
    }
}
