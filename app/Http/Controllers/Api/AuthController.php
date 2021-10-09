<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 401);
        }
        
        $token = auth()->attempt($request->all());
        
        if ($token) {
            return response()->json([
                'success' => true,
                'user' => auth()->user()->toArray(),
                'token' => $token
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Las credenciales no son validas'
        ]);
    }

    public function logout() {
        auth()->logout();

        return response()->json([
            'message' => 'Cierre de sesión'
        ]);
    }

    public function refreshToken() {
        return response()->json([
            'token' => auth()->refresh()
        ], 200);
    }
}
