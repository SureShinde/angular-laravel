<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TextoController extends Controller
{
    public function texto(Request $request){
        //var_dump($request);
        $validator = Validator::make($request->all(), [
            'inputTexto' => 'required|string',
        ]);
 
        if ($validator->fails()) {
            return response()->json(['erro' => $validator->errors()], 422);
        }

        return response()->json(['texto' => $request->inputTexto],200);
    }
}
