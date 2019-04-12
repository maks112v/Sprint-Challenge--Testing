const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  describe("get", () => {
    it("get correct status", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("get data", async () => {
      const res = await request(server).get("/");
      console.log(res.body);
      expect(res.body).toEqual([
        { title: "Pacman", genre: "Arcade", releaseYear: 1980 },
        { title: "Pac", genre: "Arcade", releaseYear: 1981 }
      ]);
    });

    it("should return a JSON object", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
  });

  describe('post', () => {
    it('return correct status', async () => {
      const res = await request(server).post('/').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980})
      expect(res.status).toBe(201)
    })

    it('return correct data', async () => {
      const res = await request(server).post('/').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980})
      expect(res.body).toBe(4)
    })
    
    it('fail if data incomplete', async () => {
      const res = await request(server).post('/').send({ title: 'Pacman', releaseYear: 1980})
      expect(res.status).toBe(422)
    })

    it('prevent duplicates by name', async () => {
      const res2 = await request(server).post('/').send({ title: 'Pacman', releaseYear: 1980})
      const res = await request(server).post('/').send({ title: 'Pacman', releaseYear: 1980})
      expect(res.status).toBe(422)
    })
  })
});
