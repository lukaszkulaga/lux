

CREATE TABLE [dbo].[klienciAdres](
    [IdAdres] [int] IDENTITY(1,1) NOT NULL,
    [IdKlienta] [int] FOREIGN KEY REFERENCES klienci(IdKlienta) NOT NULL,
    [Miejscowosc] [nvarchar](255) NULL,
    [Uica] [nvarchar](255) NULL,
    [Nr budynku] [int] NULL
    PRIMARY KEY CLUSTERED
(
[IdAdres] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO