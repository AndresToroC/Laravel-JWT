import React from 'react'
import { Navbar } from '../ui/Navbar'

export const HomeScreen = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                Bienvenido
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
