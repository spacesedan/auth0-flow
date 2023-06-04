package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Auth server")

	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to load the environment variables: %v\n", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	if err := http.ListenAndServe(":8000", r); err != nil {
		log.Fatal(err)
	}
}
