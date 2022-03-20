

CREATE TABLE [dbo].[slownikPriorytet](
    [IdPriorytet] [int] IDENTITY(1,1) NOT NULL,
    [Opis] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdPriorytet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

    insert into slownikPriorytet(Opis) values ('Bardzo wysoki')
    insert into slownikPriorytet(Opis) values ('Wysoki')
    insert into slownikPriorytet(Opis) values ('Średni')
    insert into slownikPriorytet(Opis) values ('Niski')