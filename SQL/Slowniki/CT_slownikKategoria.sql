

CREATE TABLE [dbo].[slownikKategoria](
    [IdKategoria] [int] IDENTITY(1,1) NOT NULL,
    [Opis] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdKategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

    insert into slownikKategoria(Opis) values ('Elektryczna')
    insert into slownikKategoria(Opis) values ('Hydrauliczna')
    insert into slownikKategoria(Opis) values ('Budowlana')
    insert into slownikKategoria(Opis) values ('Inne')