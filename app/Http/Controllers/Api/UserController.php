<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json([
            'users' => $users,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191|email|unique:users',
            'role' => 'required',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
        } else {
            $request['password'] = Hash::make($request->password);
        }

        User::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Usuario creado correctamente'
        ], 201);
    }

    public function edit(User $user)
    {
        return response()->json([
            'success' => true,
            'user' => $user
        ], 200);
    }

    public function update(Request $request, User $user)
    {
        $rules = [];
        if (isset($request->password)) {
            $rules = [
                'password' => 'required|confirmed|min:6',
                'password_confirmation' => 'min:6'
            ];
        }

        $validator = Validator::make($request->all(), array_merge([
            'name' => 'required|max:191',
            'email' => 'required|max:191|email|unique:users,email,'.$user->id,
            'role' => 'required'
        ], $rules));

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
        } else {
            $request['password'] = Hash::make($request->password);
        }
        
        $user->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado correctamente'
        ], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    }
}
