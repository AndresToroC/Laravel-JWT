<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        
        return response()->json([
            'clients' => $clients
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'document' => 'required|unique:clients',
            'email' => 'required|email|unique:clients',
            'address' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
        }

        Client::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Cliente creado correctamente'
        ]);
    }

    public function edit(Client $client)
    {
        return response()->json([
            'success' => true,
            'client' => $client
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'document' => 'required|unique:clients,document,'.$client->id,
            'email' => 'required|email|unique:clients,email,'.$client->id,
            'address' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
        }

        $client->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Cliente actualizado correctamente'
        ]);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cliente eliminado correctamente'
        ]);
    }
}
