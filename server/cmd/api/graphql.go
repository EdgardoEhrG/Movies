package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"server/models"
	"strings"

	"github.com/graphql-go/graphql"
)

var movies []*models.Movie

var movieType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Movie",
		Fields: graphql.Fields {
			"id": &graphql.Field{
				Type: graphql.Int,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
			"year": &graphql.Field{
				Type: graphql.Int,
			},
			"release_date": &graphql.Field{
				Type: graphql.DateTime,
			},
			"runtime": &graphql.Field{
				Type: graphql.Int,
			},
			"rating": &graphql.Field{
				Type: graphql.Int,
			},
			"mpaa_rating": &graphql.Field{
				Type: graphql.String,
			},
			"created_at": &graphql.Field{
				Type: graphql.DateTime,
			},
			"updated_at": &graphql.Field{
				Type: graphql.DateTime,
			},
		},
	},
)

var fields = graphql.Fields{
	"movie": &graphql.Field{
		Type: movieType,
		Description: "Get movie by id",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			id, ok := p.Args["id"].(int)

			if ok {
				for _, movie := range movies {
					if movie.ID == id {
						return movie, nil
					}
				}
			}
			return nil, nil
		},
	},
	"list": &graphql.Field{
		Type: graphql.NewList(movieType),
		Description: "Get all movies",
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			return movies, nil
		},
	},
	"search": &graphql.Field{
		Type: graphql.NewList(movieType),
		Description: "Search movie by title",
		Args: graphql.FieldConfigArgument{
			"titleContains": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var list []*models.Movie
			search, ok := p.Args["titleContains"].(string)

			if ok {
				for _, currentMovie := range movies {
					if strings.Contains(currentMovie.Title, search) {
						list = append(list, currentMovie)
					}
				}
			}

			return list, nil
		},
	},
}

func (app *application) moviesGraphQL(w http.ResponseWriter, r *http.Request) {
	movies, _ = app.models.DB.GetAllMovies()

	q, _ := io.ReadAll(r.Body)

	query := string(q)

	log.Println(query)

	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}

	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}

	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		app.errorJSON(w, errors.New("failed to create schema"))
		log.Println(err)
		return
	}

	params := graphql.Params{Schema: schema, RequestString: query}

	resp := graphql.Do(params)

	if len(resp.Errors) > 0 {
		app.errorJSON(w, fmt.Errorf("failed: %v", resp.Errors))
	}

	j, _ := json.MarshalIndent(resp, "", " ")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}